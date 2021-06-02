import React from "react";

function Group({ item, deleteGroup }) {
  
  return (
    <div>
      {item.id}---{item.groupName}
      <button onClick={() => deleteGroup(item.id)}>Delete group </button>
    </div>
  );
}

export default Group;
