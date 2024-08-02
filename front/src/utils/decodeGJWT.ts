export default function decodeJwt(token: string) {
    const parts = token.split(".");
    if(parts.length !== 3) {
        throw new Error("Invalid token format");
    }

    const header = JSON.parse(atob(parts[0]));
    const payload = JSON.parse(atob(parts[1]));
    return { header, payload};
}

// export function decodeJwt2(token: string) {
//     const base64Url = token.split('.')[1];
//     const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//     const jsonPayload = decodeURIComponent(
//         atob(base64)
//             .split('')
//             .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
//             .join('')
//     );

//     return JSON.parse(jsonPayload);
// }


