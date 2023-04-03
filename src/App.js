import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const dispatch = useDispatch();
  const fieldList = useSelector((state) => state.fieldList);
  const [selectedFieldType, setSelectedFieldType] = useState(null);
  const [fields, setFields] = useState(null);
  const [childFieldsNumber, setchildFieldsNumber] = useState(null);
  const [childFields, setChildFields] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
  };
  useEffect(() => {
    if (selectedFieldType !== null && selectedFieldType !== "") {
      if (
        selectedFieldType === "text" ||
        selectedFieldType === "number" ||
        selectedFieldType === "range"
      ) {
        if (selectedFieldType === "range") {
          setFields([
            {
              name: "fieldName",
              value: "",
              title: "Give a field name",
            },
            {
              name: "placeholder",
              value: "",
              title: "Give a placeholder",
            },
            {
              name: "label",
              value: "",
              title: "Give a label",
            },
            {
              name: "value",
              value: "",
              title: "Give a default value",
            },
            {
              name: "min",
              value: "",
              title: "Give a minimum value",
            },
            {
              name: "max",
              value: "",
              title: "Give a maximum value",
            },
          ]);
        } else {
          setFields([
            {
              name: "fieldName",
              value: "",
              title: "Give a field name",
            },
            {
              name: "placeholder",
              value: "",
              title: "Give a placeholder",
            },
            {
              name: "label",
              value: "",
              title: "Give a label",
            },
            {
              name: "value",
              value: "",
              title: "Give a default value",
            },
          ]);
        }
      } else if (selectedFieldType === "textarea") {
        setFields([
          {
            name: "fieldName",
            value: "",
            title: "Give a field name",
          },
          {
            name: "label",
            value: "",
            title: "Give a label",
          },
          {
            name: "value",
            value: "",
            title: "Give a default value",
          },
        ]);
      } else if (
        selectedFieldType === "checkbox" ||
        selectedFieldType === "radio" ||
        selectedFieldType === "select"
      ) {
        setFields([
          {
            name: "fieldName",
            value: "",
            title: "Give a field name",
          },
          {
            name: "label",
            value: "",
            title: "Give a label",
          },
          {
            name: "value",
            value: "",
            title: "Give a default value",
          },
          { name: "child", value: [] },
        ]);
      }
    } else {
      setFields(null);
      setchildFieldsNumber(null);
      setChildFields(null);
    }
  }, [selectedFieldType]);

  useEffect(() => {
    if (childFieldsNumber > 0) {
      let array = [];
      for (let i = 0; i < childFieldsNumber; i++) {
        array.push([
          {
            title: "Give a title",
            value: "",
            name: "title",
          },
          {
            title: "Give a value",
            value: false,
            name: "value",
          },
        ]);
      }
      setChildFields(array);
    }
  }, [childFieldsNumber]);

  return (
    <div className="p-4 md:p-8 bg-sky-950">
      <h2 className="text-[35px] font-bold text-slate-950 bg-slate-400 border-2 border-slate-600 rounded-[8px] p-2 md:p-8 py-1 md:py-2 text-center max-w-[600px] mx-auto my-6 shadow-sm uppercase">
        Dynamic Form
      </h2>
      <form
        className="w-full max-w-[800px] mx-auto bg-slate-300 p-4 md:p-16 rounded-[8px]"
        onSubmit={handleSubmit}
      >
        {/* dynamic form */}
        <div className="grid gap-4">
          {fieldList?.map((field, index) => {
            const {
              label,
              inputType,
              placeholder,
              child,
              fieldName,
              value,
              min,
              max,
            } = field;
            if (
              inputType === "text" ||
              inputType === "number" ||
              inputType === "range"
            ) {
              return (
                <div className="child">
                  <label className="text-xl mb-2 block font-semibold">
                    {label}
                  </label>
                  <input
                    name={fieldName}
                    type={inputType}
                    className={
                      inputType === "range"
                        ? inputType
                        : "w-full rounded-[8px] text-base input input-bordered border-1 border-slate-900  p-4"
                    }
                    placeholder={placeholder}
                    defaultValue={value}
                    min={min ? min : 0}
                    max={max ? max : 0}
                    onChange={(e) => {
                      dispatch({
                        type: "SET_VALUE",
                        payload: {
                          value: e.target.value,
                          path: {
                            first: fieldName,
                            second: "",
                          },
                        },
                      });
                    }}
                  />
                </div>
              );
            } else if (inputType === "checkbox" || inputType === "radio") {
              return (
                <div className="child grid gap-2">
                  <label className="text-xl mb-2 block font-semibold">
                    {label}
                  </label>
                  {child.map((c) => {
                    return (
                      <div className="flex gap-2 items-center">
                        <input
                          name={fieldName}
                          type={inputType}
                          className={inputType + " bg-white"}
                          onChange={(e) => {
                            dispatch({
                              type: "SET_VALUE",
                              payload: {
                                value:
                                  inputType === "checkbox"
                                    ? e.target.checked
                                    : true,
                                path: {
                                  first: fieldName,
                                  second: c.fieldName,
                                },
                              },
                            });
                          }}
                          value={c.fieldName}
                          defaultChecked={c.value}
                        />
                        <label className="text-xl inline-block font-semibold">
                          {c?.placeholder}
                        </label>
                      </div>
                    );
                  })}
                </div>
              );
            } else if (inputType === "textarea") {
              return (
                <div className="child grid gap-2">
                  <label className="text-xl mb-2 block font-semibold">
                    {label}
                  </label>
                  <div className="flex">
                    <textarea
                      name={fieldName}
                      type={inputType}
                      className={inputType + " w-full bg-white"}
                      onChange={(e) => {
                        dispatch({
                          type: "SET_VALUE",
                          payload: {
                            value: e.target.value,
                            path: { first: fieldName, second: "" },
                          },
                        });
                      }}
                      defaultValue={value}
                    />
                  </div>
                </div>
              );
            } else if (inputType === "select") {
              return (
                <div>
                  <label className="text-xl mb-2 block font-semibold">
                    {label}
                  </label>
                  <select
                    className="select select-bordered w-full"
                    onChange={(e) => {
                      dispatch({
                        type: "SET_VALUE",
                        payload: {
                          value: e.target.value,
                          path: {
                            first: fieldName,
                            second: e.target.value,
                          },
                        },
                      });
                    }}
                  >
                    {child.map((c) => {
                      return <option value={c.value}>{c.title}</option>;
                    })}
                  </select>
                </div>
              );
            }
          })}
        </div>
        {/* btn list */}
        <div className="my-6 mt-10 flex flex-wrap gap-2">
          <input
            type="submit"
            className="btn btn-sm btn-success"
            value={"Submit"}
          />
          <label htmlFor="my-modal-3" className="btn btn-sm btn-info">
            Add Field
          </label>
        </div>
      </form>
      {/* Put this part before </body> tag */}
      <input type="checkbox" id="my-modal-3" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="my-modal-3"
            className="btn btn-sm btn-circle absolute right-2 top-2"
            onClick={() => {
              setTimeout(() => {
                setSelectedFieldType(null);
                setFields([]);
                setChildFields([]);
              }, 1000);
            }}
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">Add new field</h3>
          <div className="mt-6">
            <select
              className="select select-bordered w-full"
              onChange={(e) => {
                setSelectedFieldType(e.target.value);
                setChildFields([]);
              }}
              defaultValue={null}
            >
              <option selected value="">
                Select Type
              </option>
              <option value="text">Text</option>
              <option value="number">Number</option>
              <option value="range">range</option>
              <option value="checkbox">CheckBox</option>
              <option value="radio">Radio</option>
              <option value="textarea">Textarea</option>
              <option value="select">Select</option>
            </select>
            {fields && (
              <div className="mt-4 grid gap-4">
                {fields?.map((f) => {
                  if (f.name === "child") {
                    return (
                      <div>
                        <label>How many {selectedFieldType} you need</label>
                        <input
                          name={f.name}
                          type="number"
                          placeholder="Type number"
                          className="input input-bordered w-full"
                          onChange={(e) => setchildFieldsNumber(e.target.value)}
                        />
                      </div>
                    );
                  } else {
                    return (
                      <div>
                        <label>{f.title}</label>
                        <input
                          name={f.name}
                          type="text"
                          placeholder="Type here"
                          className="input input-bordered w-full"
                        />
                      </div>
                    );
                  }
                })}
                {childFieldsNumber > 0 && (
                  <>
                    {childFields?.map((c, index) => {
                      return (
                        <div className="border p-3 rounded-[8px]">
                          <p className="text-green-600 my-2 font-bold uppercase">
                            {selectedFieldType.slice(0, 1).toUpperCase() +
                              selectedFieldType.slice(
                                1,
                                selectedFieldType.length
                              )}
                            : {index + 1}
                          </p>
                          {c.map((child) => {
                            return (
                              <>
                                <label>{child.title}</label>
                                <input
                                  name={child.name}
                                  type="text"
                                  placeholder="Type here"
                                  className="input input-bordered w-full"
                                />
                              </>
                            );
                          })}
                        </div>
                      );
                    })}
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
