import { BASE_URL } from "../../constant/BaseUrl";

export const createnewMessage = async (messageObject) => {
    return new Promise(async (resolve, reject) => {
        return fetch(`${BASE_URL}/chat/message/add`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({...messageObject}),
            })
            .then((res)=>res.json())
            .then((res) => {
                resolve({ data: res, error: false })
            })
            .catch((e) => {
                reject({ data: e, error: true });
            })
    });
}