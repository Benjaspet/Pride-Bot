import axios from "axios";
import * as buffer from "buffer";

export default class AvatarUtil {

    public static async getFlairedAvatarAsBase64(avatarUrl: string, flair: string): Promise<string> {
        return await axios(`https://app.ponjo.club/v1/pride/avatar?flair=${flair}&avatar=${encodeURIComponent(avatarUrl)}&format=base64`, {
            method: "post",
        }).then(async response => {
           if (response.status !== 200) {
               return "An error occurred.";
           } else {
               return response.data.image.output;
           }
        });
    }

    public static async getFlairedAvatar(avatarUrl: string, flair: string): Promise<any> {
        return await axios(`https://app.ponjo.club/v1/pride/avatar?flair=${flair}&avatar=${encodeURIComponent(avatarUrl)}&format=png`, {
            method: "post",
        }).then(async response => {
            if (response.status !== 200) {
                return "An error has occurred.";
            } else {
                return response;
            }
        })
    }
}