const useFormField = ({
  requiredMsg,
  placeholder,
  required,
  rules,
  initialValue,
  fieldName,
  dataDetail,
}) => {
  // const { dataDetail } = useListBase();

  const getRequiredMsg = () => {
    // Use intl instead
    return requiredMsg || "Required";
  };

  const getPlaceHolder = () => {
    if (placeholder) {
      return placeholder;
    } else if (required) {
      return "";
    }

    return "";
  };

  const getRules = () => {
    const rules = [];

    if (required) {
      rules.push({
        required,
        message: getRequiredMsg(),
      });
    }

    return rules;
  };

  const getInitValue = () => {
    if (initialValue) {
      return initialValue;
    } else if (dataDetail && dataDetail[fieldName]) {
      return dataDetail[fieldName];
    } else return undefined;
  };

  const mergeRules = (rulesA, rulesB) => {
    return [...rulesA, ...rulesB];
  };

  return {
    placeholder: getPlaceHolder(),
    rules: mergeRules(getRules(), rules || []),
  };
};

export default useFormField;
