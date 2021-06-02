import { firestore } from "../../firebase/firebase";

export const fetchData = () => {
  return {
    group: wrapPromise(fetchGroupCreate()),
  };
};
const wrapPromise = (promise) => {
  let status = "pending";
  let result;

  let suspender = promise.then(
    (res) => {
      status = "success";
      result = res;
    },
    (err) => {
      status = "error";
      result = err;
    }
  );
  return {
    read() {
      if (status === "pending") {
        throw suspender;
      } else if (status === "error") {
        throw result;
      } else if (status === "success") {
        return result;
      }
    },
  };
};

// export const fetchGroupCreate = () => {
//   console.log("fetching groupapiiiiii");

//   return firestore
//     .collection("group")
//     .where("adminId", "==", "js35kAKAXXQDVmtzE83d63qBSru2")
//     .get()
//     .then((querySnapshot) => {
//       return querySnapshot.forEach((doc) => doc.data());
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// };

export const fetchGroupCreate = async () => {
  console.log("fetching groupapiiiiii");

  const response = firestore
    .collection("group")
    .where("adminId", "==", "js35kAKAXXQDVmtzE83d63qBSru2");
  const data = await response.get();
  return data.docs;
};

// export const fetchGroupCreate = () => {
//   console.log("fetching groupapiiiiii");
//   return fetch("https://randomuser.me/api")
//     .then((x) => x.json())
//     .then((x) => x.results[0]);
// };
