import { BASE_URL } from "../../constant/BaseUrl";


export const callgetMessage = async (roomId) => {
    return new Promise(async (resolve, reject) => {
        return fetch(`${BASE_URL}/chat/get/id`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({id:roomId}),
            })
            .then((res) =>res.json())
            .then((data)=>{
                resolve({ data: data, error: false })
            })
            .catch((e) => {
                reject({ data: e, error: true });
            })
    });
}