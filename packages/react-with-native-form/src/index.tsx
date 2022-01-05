import * as React from "react";
import { useState, RefObject, createRef, useEffect } from "react";
import { ActivityIndicator, Div, Label, Strong, Form } from "react-with-native";

const mergeObjectsArray = (
  previous: { [key: string]: any },
  current: { [key: string]: any }
) => ({ ...previous, ...current });

export function notEmpty<TValue>(
  value: TValue | null | undefined
): value is TValue {
  return value !== null && value !== undefined;
}

export const makeInputField = <TInputs, T extends Keys<TInputs>>(
  type: T,
  config: Omit<Field<TInputs, T>, "type">
) => {
  return () => ({ type, ...config });
};

/**
 * type of every specific field in a form
 */
export type Field<TInputs, T extends Keys<TInputs> = Keys<TInputs>> = {
  /**
   * type of the field (any plugin type), defaults to first plugin
   */
  type?: Keys<TInputs>;
  /**
   * unique identifier of the field
   */
  field: string;
  /**
   * title of the field
   */
  title?: string;
  shouldHide?: (state: any) => boolean;
  titleFromState?: (state: any) => string;
  /**
   * returns either false if there's no error or a string of an error message if there is one
   */
  hasError?: (
    value: TInputs[T] extends PluginInputType ? TInputs[T]["value"] : any,
    state: Partial<PossibleState>
  ) => boolean | string;
  startSection?: boolean;
  sectionTitle?: string;
  description?: string;
  /**
   * initalValue (can be declared here or on Form defaultValues prop). This has priority
   */
  initialValue?: TInputs[T] extends PluginInputType ? TInputs[T]["value"] : any;
  /**
   * any extra properties that can be given to a specific input
   */
  extra?: TInputs[T] extends PluginInputType ? TInputs[T]["extra"] : any;
};

export type Keys<TObject> = Extract<keyof TObject, string>;

export interface ExtendedField<TInputs, T extends Keys<TInputs>>
  extends Field<TInputs, T> {
  /**
   * this is added to any field
   */
  reference?: RefObject<HTMLDivElement>;
}

export type SubmitProps = {
  onSubmit: () => void;
  loading: boolean;
  available: boolean;
  submitButtonText?: string;
};

export const inputClassWithoutWidth = `text-sm px-3 py-3 text-gray-700 border-gray-300 border rounded-md focus:outline-none`;
export const inputClass = `w-full ${inputClassWithoutWidth}`;
export type DefaultConfig = {
  extraClassName?: string;
  replaceClassName?: string;
};

type ErrorsArray = Error[];
type RejectValue = string | ErrorsArray;
export type Error = {
  message: string | true;
  propertyPath: string;
};

export interface PluginInputType {
  /**
   * universal configuration options of the input
   */
  config?: { [key: string]: any };
  /**
   * type of the value of the input
   */
  value: any;
  /**
   * extra possible field specific settings of the input
   */
  extra?: any;
  /**
   *
   */
  component?: any;
}

export type Plugin<TInput extends PluginInputType> = {
  component: PluginComponent<TInput>;
  config?: TInput["config"];
};

//NB: why are the prop comments not shown in intellisense?
export type PluginComponent<TInput extends PluginInputType> = ((props: {
  onChange: (value: TInput["value"]) => void;
  /**
   * value is never undefined, unless you didn't declare defaultInitialValue
   */
  value: TInput["value"];
  extra: TInput["extra"];
  config: TInput["config"];
  /**
   * randomly generated id when initialized the form
   */
  id: string;

  /**
   * if there are multiple errors for this single field (from the backend), they can be given here. Key is in format `{fieldName}.{subfieldName}`, value should be the string containing the error
   */
  errors?: Error[];
  errorClassName?: string;
}) => JSX.Element) & {
  defaultInitialValue: TInput["value"];
};

type Plugins<TInputs> = { [key in keyof TInputs]: Plugin<any> };
export type RenderInputContainerType =
  | undefined
  | ((props: InputContainerProps) => JSX.Element);

export type InputContainerProps = {
  children: any;
  description?: string;
  sectionTitle?: string;
  startSection?: boolean;
  title?: string;
  next?: any;
  isLast?: boolean;
  error?: string | boolean;
  extra?: PluginInputType["extra"];
  config?: PluginInputType["config"];
  errorClassName?: string;
};

export type DataFormConfig<TInputs> = {
  submitButtonText?: string;
  title?: string;
  backButton?: () => void;
  plugins?: Plugins<TInputs>; //<TValues>;
  onError?: (message: string) => void;
  renderSubmitComponent?: (props: {
    onSubmit: () => void;
    loading: boolean;
    available: boolean;
    submitButtonText?: string;
  }) => JSX.Element;
  renderInputContainer?: RenderInputContainerType;
  renderTitle?: (props: {
    title?: string;
    backButton?: () => void;
  }) => JSX.Element;
  stickySubmit?: boolean;
  submitClassName?: string;
  errorClassName?: string;
  successClassName?: string;
};

/**
 * the possible states, like { password: string, text: string }
 */
export type PossibleValues<TInputs> = {
  [K in keyof TInputs]: TInputs[K] extends PluginInputType
    ? TInputs[K]["value"]
    : never;
};

export type PossibleState = {
  [key: string]: any;
};

export type ResolveType = (message: string) => void;

export type RejectType = (stringOrErrorArray: RejectValue) => void;
export type DataFormProps<TInputs, TState extends { [key: string]: any }> = {
  /**
   * array of fields created with makeField
   */
  fields: Array<<T extends Keys<TInputs>>() => Field<TInputs, T>>;
  /**
   * optionally, you can pass partial default values here.
   */
  initialValues?: Partial<TState>;
  /**
   * DEPRECATED, you can pass partial default values here. Please use initialValues
   */
  defaultValues?: Partial<TState>;
  /**
   * callback that's called when submit button has been pressed
   */
  onSubmit: (values: TState, resolve: ResolveType, reject: RejectType) => void;
  /**
   * optionally, you can use the onClickSubmit externally
   */
  withSubmitProps?: (props: SubmitProps) => void;
  /**
   * if true no submit button will be rendered. handy in combination with withSubmitProps
   */
  noSubmit?: boolean;
} & DataFormConfig<TInputs>;

export const DefaultInputContainer = ({
  children,
  startSection,
  sectionTitle,
  title,
  description,
  error,
  extra,
  errorClassName,
  config,
  isLast,
  next,
}: InputContainerProps) => (
  <Div>
    {startSection ? (
      <Div
        style={{
          display: "flex",
          height: 40,
          justifyContent: "center",
          paddingLeft: 10,
        }}
      >
        {sectionTitle ? (
          <p>
            <Strong>{sectionTitle}</Strong>
          </p>
        ) : (
          <div style={{ height: 40 }} />
        )}
      </Div>
    ) : null}

    {/* This is the section title */}
    <Div className="pt-0 mb-6">
      {title ? (
        <Label className="block mb-2 text-sm font-bold">{title}</Label>
      ) : null}
      {description && (
        <Div className={`flex mx-3 mb-2 items-start `}>
          <p className={`text-gray-500 italic`}>{description}</p>
        </Div>
      )}
      {error ? (
        <p className={errorClassName || `mr-3 mb-2 text-red-500`}>
          {error || "Invalid value"}
        </p>
      ) : null}

      {children}
    </Div>
  </Div>
);
const getPlugin = <TInputs extends AllPluginInputTypes>(
  type: string | undefined,
  plugins: Plugins<TInputs>
) => {
  return type
    ? plugins[type]
    : plugins[Object.keys(plugins)[0] as keyof Plugins<TInputs>];
};
export const Input = <
  TInputs extends AllPluginInputTypes,
  T extends keyof TInputs
>({
  type,
  plugin,
  title,
  onChange,
  value,
  isLast,
  startSection,
  sectionTitle,
  next,
  extra,
  errors,
  reference,
  description,
  config,
  id,
  renderInputContainer,
  errorClassName,
}: {
  plugin: PluginComponent<TInputs[T]>;
  type: string;
  config: TInputs[T]["config"];
  extra: TInputs[T]["extra"];
  next: any;
  title?: string;
  onChange: (newValue: TInputs[T]["value"]) => void;
  value: TInputs[T]["value"];
  errors?: ErrorsArray;
  isLast: boolean;
  startSection?: boolean;
  sectionTitle?: string;
  reference?: RefObject<HTMLDivElement>;
  description?: string;
  id: string;
  renderInputContainer?: RenderInputContainerType;
  errorClassName?: string;
}) => {
  const InputComponent = plugin;
  const InputContainer = renderInputContainer || DefaultInputContainer;

  return (
    <Div ref={reference}>
      <InputContainer
        {...{
          description,
          sectionTitle,
          startSection,
          title,
          next,
          isLast,
          id,
          type,
          error: errors?.find((x) => x.propertyPath === id)?.message,
          extra,
          config,
          errorClassName,
        }}
      >
        <InputComponent
          {...{
            id,
            config,
            extra,
            onChange,
            value,
            errors,
            errorClassName,
          }}
        />
      </InputContainer>
    </Div>
  );
};

const DefaultTitle = ({
  title,
  backButton,
}: {
  title?: string;
  backButton?: () => void;
}) => {
  return title ? (
    <Div className="flex items-center mb-10 ">
      {backButton && (
        <Div onClick={backButton} className={`p-4 cursor-pointer`}>
          back
        </Div>
      )}
      <h3 className="text-2xl font-bold">{title}</h3>
    </Div>
  ) : null;
};

export function deepEqual(
  object1: { [key: string]: any },
  object2: { [key: string]: any }
) {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);
  if (keys1.length !== keys2.length) {
    return false;
  }
  for (const key of keys1) {
    const val1 = object1[key];
    const val2 = object2[key];
    const areObjects = isObject(val1) && isObject(val2);
    if (
      (areObjects && !deepEqual(val1, val2)) ||
      (!areObjects && val1 !== val2)
    ) {
      return false;
    }
  }
  return true;
}
export function isObject(object: any): object is object {
  return object != null && typeof object === "object";
}

const DataForm = <TInputs, TState extends { [key: string]: any }>({
  fields,
  defaultValues,
  initialValues,
  onSubmit,
  withSubmitProps,
  noSubmit,
  submitButtonText,
  title,
  backButton,
  plugins,
  renderSubmitComponent,
  renderInputContainer,
  stickySubmit,
  renderTitle,
  submitClassName,
  errorClassName,
  successClassName,
}: DataFormProps<TInputs, TState>) => {
  //sometimes use defaultValues (deprecated)
  initialValues = initialValues ? initialValues : defaultValues;
  if (!plugins) {
    throw new Error("No plugins given");
  }
  //Generate unique id for the form
  const [id] = useState(`Form${String(Math.round(Math.random() * 1000000))}`);

  const [fieldsWithReferences, setFieldsWithReferences] = useState<
    ExtendedField<TInputs, Keys<TInputs>>[]
  >([]);

  useEffect(() => {
    setFieldsWithReferences(
      fields.map((field) => {
        return { ...field(), reference: createRef<HTMLDivElement>() };
      })
    );
  }, [fields]);

  const initialValuesPartial: TState = fields.reduce((all, field) => {
    const type = field().type!;
    const plugin = getPlugin(type, plugins);
    const defaultInital = plugin.component.defaultInitialValue;
    const initial = field().initialValue;
    const key = field().field;
    const value =
      initial !== undefined
        ? initial
        : defaultInital !== undefined
        ? defaultInital
        : undefined;

    return {
      ...all,
      [key]: value,
    };
  }, {}) as TState;

  const initialState = { ...initialValuesPartial, ...initialValues };

  const [state, setState] = useState<TState>(initialState);

  //used to check if the initialValues have changed
  const [initialValuesState, setInitialValuesState] = useState<
    TState | undefined
  >();

  useEffect(() => {
    if (!initialValuesState || !deepEqual(initialState, initialValuesState)) {
      console.log("initialValues have changed");
      setState(initialState);
      setInitialValuesState(initialState);
    }
  }, [initialState]);

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<ErrorsArray>([]);
  const [success, setSuccess] = useState<string | undefined>();

  const notReadyField = fieldsWithReferences.find((x) =>
    x.hasError?.(state[x.field], state)
  );

  const setErrorsReject = (stringOrErrorArray: RejectValue) => {
    if (stringOrErrorArray) {
      const newErrors: ErrorsArray =
        typeof stringOrErrorArray === "string"
          ? [{ propertyPath: "__GLOBAL", message: stringOrErrorArray }]
          : stringOrErrorArray;

      //this will be frontend and backenderrrors
      const allErrors = { ...errors, ...newErrors };
      setErrors(allErrors);

      //scroll to the first field that contains an error
      const firstNotReadyField = fieldsWithReferences.filter(
        (x) => newErrors.find((y) => y.propertyPath === x.field) !== undefined
      )[0];

      const top =
        (firstNotReadyField?.reference?.current?.getBoundingClientRect().top ||
          0) +
        window.scrollY -
        100;

      if (typeof window !== "undefined") {
        window.scrollTo({
          top,
          behavior: "smooth",
        });
      }
    }
  };

  const onClickSubmit = () => {
    const frontendErrorArray: ErrorsArray = fields
      .map((field) => {
        const hasError = field().hasError?.(state[field().field], state);
        return hasError
          ? { propertyPath: field().field, message: hasError }
          : null;
      })
      .filter(notEmpty);

    setErrors(frontendErrorArray);

    if (frontendErrorArray.length === 0) {
      //no errors
      setLoading(true);
      onSubmit(
        state,
        (successMessage) => {
          setSuccess(successMessage);
          setLoading(false);
        },
        (stringOrErrorArray) => {
          setErrorsReject(stringOrErrorArray);
          setLoading(false);
        }
      );
    } else {
      //scroll to the error
      /// onError("Please fill in all fields correctly");

      const top =
        (notReadyField?.reference?.current?.getBoundingClientRect().top || 0) +
        window.scrollY -
        100;

      if (typeof window !== "undefined") {
        window.scrollTo({
          top,
          behavior: "smooth",
        });
      }
    }
  };

  const available = !loading && !notReadyField;

  const submitProps: SubmitProps = {
    onSubmit: onClickSubmit,
    loading,
    available,
    submitButtonText,
  };

  // console.log("Rendering Form");

  useEffect(() => {
    withSubmitProps?.(submitProps);
  }, [loading, available, submitButtonText]);

  const Title = renderTitle || DefaultTitle;

  const Submit = () =>
    noSubmit ? null : renderSubmitComponent ? (
      renderSubmitComponent(submitProps)
    ) : (
      <button
        disabled={loading}
        className={`${
          available ? "bg-orange" : "bg-gray-300"
        }  inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
        onClick={onClickSubmit}
      >
        {loading ? (
          <Div className="mr-2">
            <ActivityIndicator />
          </Div>
        ) : null}
        {submitButtonText || "Save"}
      </button>
    );
  const globalError = errors?.find((x) => x.propertyPath === "__GLOBAL__");
  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        onClickSubmit();
      }}
    >
      <Div className="w-full">
        <Title title={title} backButton={backButton} />

        {success ? <p className={successClassName}>{success}</p> : null}
        {globalError ? (
          <p className={errorClassName || "text-red-600"}>
            {globalError.message}
          </p>
        ) : null}

        {fieldsWithReferences.map((field, index) => {
          // Take the first plugin if the plugin isn't defined.
          const plugin = getPlugin(field.type, plugins);

          if (!plugin) {
            return (
              <p>
                Plugin not found ({field.field}, {field.type})
              </p>
            );
          }

          const next = fields[index + 1]?.();

          const onChange = (newValue: any) => {
            const newState = { [field.field]: newValue };

            const fieldError = errors.find(
              (x) => x.propertyPath === field.field
            );

            if (fieldError && !field.hasError?.(newValue, state)) {
              const newErrors = errors.filter(
                (x) => x.propertyPath !== field.field
              );
              setErrors(newErrors);
            }

            setState({ ...state, ...newState });

            withSubmitProps?.(submitProps);
          };

          const uniqueId = `${id || ""}.${field.field}`;

          return field.shouldHide?.(state) ? null : (
            <Input
              renderInputContainer={renderInputContainer}
              id={uniqueId}
              config={plugin.config}
              plugin={plugin.component}
              extra={field.extra}
              reference={field.reference}
              next={next}
              key={`field-${field.field}`}
              type={field.type!}
              title={
                field.titleFromState ? field.titleFromState(state) : field.title
              }
              value={state[field.field]}
              onChange={onChange}
              isLast={index === fields.length - 1}
              startSection={field.startSection}
              sectionTitle={field.sectionTitle}
              description={field.description}
              errors={errors.filter(
                (e) =>
                  e.propertyPath === field.field ||
                  e.propertyPath.includes(`${field.field}.`)
              )}
            />
          );
        })}
      </Div>
      {Submit ? (
        <Div
          className={`${stickySubmit ? "sticky bottom-0" : ""} ${
            submitClassName || "mb-2 py-2"
          }`}
        >
          <Submit />
        </Div>
      ) : null}
    </Form>
  );
};
export type AllPluginInputTypes = { [key: string]: PluginInputType };

export const setConfig = <TInputs, TState>(
  DataForm: (props: DataFormProps<TInputs, TState>) => JSX.Element,
  config: DataFormConfig<TInputs>
) => {
  return (props: DataFormProps<TInputs, TState>) => (
    <DataForm {...config} {...props} />
  );
};

export default DataForm;
