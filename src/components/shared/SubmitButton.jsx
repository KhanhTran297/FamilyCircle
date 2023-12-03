import { Button, Form } from "antd";

import { useEffect, useState } from "react";

const SubmitButton = ({ form, content, className, isLoading }) => {
  const [submittable, setSubmittable] = useState(false);
  const [loadings, setLoadings] = useState([]);
  const enterLoading = (index) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });
    setTimeout(() => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        return newLoadings;
      });
    }, 6000);
  };
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
      loading={isLoading}
      onClick={() => enterLoading(0)}
    >
      {content}
    </Button>
  );
};

export default SubmitButton;
