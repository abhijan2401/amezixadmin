export const getNotes = async (data) => {
  try {
    const response = await fetch("http://ec2-3-108-56-128.ap-south-1.compute.amazonaws.com:8001/getAllData", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({
        tablename: data,
      }),
    });
    const res = await response.json();
    console.log(res);
    return res;
  } catch (error) {
    console.error("Error:", error);
  }
};

// export const bannerDetails = async() => {
//   try {
//     const response = await fetch("http://ec2-3-108-56-128.ap-south-1.compute.amazonaws.com:8001/Banner", {
//       method: "POST",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
        
//       }),
//     });
//     const res = await response.json();
//     console.log(res);
//     return res;
//   } catch (error) {
//     console.log("Error", error)
//   }
// }
