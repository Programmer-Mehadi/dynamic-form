import { useDispatch, useSelector } from "react-redux";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  const fieldList = useSelector((state) => state.fieldList);
  const handleSubmit = (event) => {
    event.preventDefault();
  };

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
        <div className="my-6 mt-10 flex flex-wrap gap-6">
          <input
            type="submit"
            className="btn btn-sm btn-success"
            value={"Submit"}
          />
          <input className="btn btn-sm btn-info" value={"Add new field"} />
        </div>
      </form>
    </div>
  );
}

export default App;
