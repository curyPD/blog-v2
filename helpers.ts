import Resizer from "react-image-file-resizer";
import { ref, update, push, remove } from "firebase/database";
import { db, storage } from "@/firebase/firebase";
import {
    ref as storageRef,
    uploadString,
    getDownloadURL,
    deleteObject,
} from "firebase/storage";

export function resizeFile(
    file: Blob,
    maxW: number,
    maxH: number,
    q: number,
    minW?: number,
    minH?: number
): Promise<string> {
    return new Promise((resolve) => {
        Resizer.imageFileResizer(
            file,
            maxW,
            maxH,
            "JPEG",
            q,
            0,
            (uri) => {
                resolve(uri as string);
            },
            "base64",
            minW,
            minH
        );
    });
}

export async function writeNewArticle(
    title: string,
    filePreviewURL: string,
    content: string
) {
    try {
        const newArticleKey: string = push(ref(db, `articles`)).key as string;
        const updates: Record<string, string> = {};
        const imageRef = storageRef(storage, `images/${newArticleKey}/image`);
        const snapshot = await uploadString(
            imageRef,
            filePreviewURL,
            "data_url"
        );
        const imageURL: string = await getDownloadURL(snapshot.ref);
        const dateISO = new Date().toISOString();
        updates[`/articles/${newArticleKey}/id`] = newArticleKey;
        updates[`/articles/${newArticleKey}/title`] = title;
        updates[`/articles/${newArticleKey}/created`] = dateISO;
        updates[`/articles/${newArticleKey}/last_modified`] = dateISO;
        updates[`/articles/${newArticleKey}/image`] = imageURL;
        updates[`/articles/${newArticleKey}/content`] = content;

        update(ref(db), updates);
    } catch (err) {
        throw err;
    }
}

export async function submitEditedArticle(
    id: string,
    title: string,
    filePreviewURL: string,
    prevImageURL: string,
    content: string
) {
    try {
        const updates: Record<string, string> = {};
        if (prevImageURL !== filePreviewURL) {
            const imageRef = storageRef(storage, `images/${id}/image`);
            const snapshot = await uploadString(
                imageRef,
                filePreviewURL,
                "data_url"
            );
            const imageURL: string = await getDownloadURL(snapshot.ref);
            updates[`/articles/${id}/image`] = imageURL;
        }
        const dateISO = new Date().toISOString();
        updates[`/articles/${id}/title`] = title;
        updates[`/articles/${id}/last_modified`] = dateISO;
        updates[`/articles/${id}/content`] = content;

        update(ref(db), updates);
    } catch (err) {
        throw err;
    }
}

export async function deleteArticle(id: string) {
    try {
        const imageRef = storageRef(storage, `images/${id}/image`);
        await Promise.all([
            remove(ref(db, `articles/${id}`)),
            deleteObject(imageRef),
        ]);
    } catch (err) {
        throw err;
    }
}
