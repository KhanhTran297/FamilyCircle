import { Button, Form } from "antd";

import { useEffect, useState } from "react";

const SubmitButton = ({ form, content, className }) => {
  const [submittable, setSubmittable] = useState(false);

  // Watch all values
  const values = Form.useWatch([], form);
  useEffect(() => {
    form
      .validateFields({
        validateOnly: true,
      })
      .then(
        () => {
          setSubmittable(true);
        },
        () => {
          setSubmittable(false);
        }
      );
  }, [values]);
  return (
    <Button
      type="default"
      htmlType="submit"
      disabled={!submittable}
      className={className}
    >
      {content}
    </Button>
  );
};

export default SubmitButton;
