// Vite redirects react-simple-maps' runtime prop-types import here so production
// does not ship validators that are only useful during development.
type Validator = ((...args: unknown[]) => null) & {
  isRequired: Validator;
};

function createValidator(): Validator {
  const validator = (() => null) as Validator;

  validator.isRequired = validator;

  return validator;
}

const PropTypes = {
  array: createValidator(),

  func: createValidator(),

  node: createValidator(),

  number: createValidator(),

  object: createValidator(),

  string: createValidator(),

  arrayOf: () => createValidator(),

  oneOfType: () => createValidator(),
};

export default PropTypes;
