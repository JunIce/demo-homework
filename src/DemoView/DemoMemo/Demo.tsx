import React, { memo, useCallback, useState } from "react";
//@ts-ignore
const Item: React.FC<{ id: any; value: any; onChange: any }> = memo(({ id, value, onChange }: any) => {
  return (
    <div
      style={{
        width: "200px",
        display: "inline-block",
      }}
    >
      <h3>{id}</h3>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(id, e.target.value)}
      />
    </div>
  );
});

const ListComp = () => {
  const [items, setItems] = useState([
    { value: "", id: 1 },
    { value: "", id: 2 },
    { value: "", id: 3 },
  ]);
  const onChange = useCallback((id: any, value: any) => {
    setItems(
      items => items.map((item) => {
        if(item.id === id) {
          item.value = value
        }
        return item;
      })
    );
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <div>{JSON.stringify(items)}</div>
      {items.map((item, index) => (
        <Item key={index} id={item.id} value={item.value} onChange={onChange} />
      ))}
    </div>
  );
};

// function ListComp() {
//   const [list, setList] = useState([
//     {
//       id: 1,
//       value: "",
//     },
//     {
//       id: 2,
//       value: "",
//     },
//     {
//       id: 3,
//       value: "",
//     },
//   ]);

//   const onChange = useCallback((id: any, value: any) => {
//     setList((preList) =>
//       preList.map((item) => {
//         if (item.id === id) {
//           item.value = value;
//         }
//         return item;
//       })
//     );
//   }, []);

//   return (
//     <div>
//       <div>{JSON.stringify(list)}</div>

//       <div>
//         {list.map((item, idx) => (
//           <Item
//             key={idx}
//             id={item.id}
//             value={item.value}
//             onChange={onChange}
//           ></Item>
//         ))}
//       </div>
//     </div>
//   );
// }

export { ListComp };
