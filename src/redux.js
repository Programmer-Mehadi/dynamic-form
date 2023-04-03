import { createStore } from "redux";

const initialstate = {
  fieldList: [
    // {
    //   id: "53535",
    //   fieldName: "firstName",
    //   inputType: "text",
    //   placeholder: "Enter first name",
    //   label: "First Name",
    //   value: "",
    // },
    // {
    //   id: "53535",
    //   fieldName: "lastName",
    //   inputType: "text",
    //   placeholder: "Enter last name",
    //   label: "Last Name",
    //   value: "",
    // },
    // {
    //   id: "53535",
    //   fieldName: "skillSets",
    //   inputType: "checkbox",
    //   label: "Select your skill sets:",
    //   child: [
    //     {
    //       placeholder: "HTML",
    //       fieldName: "html",
    //       value: false,
    //     },
    //     {
    //       placeholder: "CSS",
    //       value: false,
    //       fieldName: "css",
    //     },
    //     {
    //       placeholder: "JAVASCRIPT",
    //       value: false,
    //       fieldName: "javascript",
    //     },
    //     {
    //       placeholder: "REACT",
    //       value: false,
    //       fieldName: "react",
    //     },
    //   ],
    // },
    // {
    //   id: "53535",
    //   fieldName: "gender",
    //   inputType: "radio",
    //   label: "Select your Gender:",
    //   child: [
    //     {
    //       placeholder: "MALE",
    //       fieldName: "male",
    //       value: false,
    //     },
    //     {
    //       placeholder: "FEMALE",
    //       value: false,
    //       fieldName: "female",
    //     },
    //   ],
    // },
    // {
    //   id: "53535",
    //   fieldName: "range",
    //   inputType: "range",
    //   label: "Select your range:",
    //   min: 0,
    //   max: 1000,
    //   value: "850",
    // },
    // {
    //   id: "53535",
    //   fieldName: "address",
    //   inputType: "textarea",
    //   label: "Address:",
    //   value: "",
    // },
    // {
    //   id: "53535",
    //   fieldName: "role",
    //   inputType: "select",
    //   label: "Select role:",
    //   value: "",
    //   child: [
    //     {
    //       fieldName: "admin",
    //       title: "Admin",
    //       value: "admin",
    //     },
    //     {
    //       fieldName: "buyer",
    //       title: "Buyer",
    //       value: "buyer",
    //     },
    //     {
    //       fieldName: "seller",
    //       title: "Seller",
    //       value: "seller",
    //     },
    //   ],
    // },
  ],
};

const reducer = (state = initialstate, action) => {
  switch (action.type) {
    case "SET_VALUE":
      for (let i = 0; i < state.fieldList.length; i++) {
        if (state.fieldList[i].fieldName === action.payload.path.first) {
          if (action.payload.path.second !== "") {
            for (let j = 0; j < state.fieldList[i].child.length; j++) {
              if (
                state.fieldList[i].child[j].fieldName ===
                action.payload.path.second
              ) {
                if (state.fieldList[i].inputType === "select") {
                  state.fieldList[i].child[j].select = true;
                } else {
                  state.fieldList[i].child[j].value = action.payload.value;
                }
              } else {
                if (state.fieldList[i].inputType === "radio") {
                  state.fieldList[i].child[j].value = false;
                } else if (state.fieldList[i].inputType === "select") {
                  state.fieldList[i].child[j].select = false;
                }
              }
            }
          } else {
            state.fieldList[i].value = action.payload.value;
          }
        }
      }
      return state;
    case "ADD_FIELD":
      console.log(action.payload);
      return { ...state, fieldList: [...state.fieldList, action.payload.data] };
    default:
      return state;
  }
};

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
