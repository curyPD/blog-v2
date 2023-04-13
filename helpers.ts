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
    description: string,
    file: File,
    content: string
) {
    try {
        const newArticleKey: string = push(ref(db, `articles`)).key as string;
        const updates: Record<string, string> = {};

        const [imageSmURL, imageMdURL, imageLgURL] = await getResizedImageURLs(
            file,
            newArticleKey
        );

        const dateISO = new Date().toISOString();
        updates[`/articles/${newArticleKey}/id`] = newArticleKey;
        updates[`/articles/${newArticleKey}/title`] = title;
        updates[`/articles/${newArticleKey}/description`] = description;
        updates[`/articles/${newArticleKey}/created`] = dateISO;
        updates[`/articles/${newArticleKey}/last_modified`] = dateISO;
        updates[`/articles/${newArticleKey}/imageSm`] = imageSmURL;
        updates[`/articles/${newArticleKey}/imageMd`] = imageMdURL;
        updates[`/articles/${newArticleKey}/imageLg`] = imageLgURL;
        updates[`/articles/${newArticleKey}/content`] = content;

        await update(ref(db), updates);
    } catch (err) {
        throw err;
    }
}

export async function submitEditedArticle(
    id: string,
    title: string,
    description: string,
    content: string,
    file: File | null
) {
    try {
        const updates: Record<string, string> = {};
        if (file) {
            const [imageSmURL, imageMdURL, imageLgURL] =
                await getResizedImageURLs(file, id);
            updates[`/articles/${id}/imageSm`] = imageSmURL;
            updates[`/articles/${id}/imageMd`] = imageMdURL;
            updates[`/articles/${id}/imageLg`] = imageLgURL;
        }
        const dateISO = new Date().toISOString();
        updates[`/articles/${id}/title`] = title;
        updates[`/articles/${id}/description`] = description;
        updates[`/articles/${id}/last_modified`] = dateISO;
        updates[`/articles/${id}/content`] = content;

        await update(ref(db), updates);
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

async function createResizedVersionsOfImage(file: File): Promise<string[]> {
    try {
        const [imageSm, imageMd, imageLg] = await Promise.all([
            resizeFile(file, 112, 72, 60),
            resizeFile(file, 1232, 808, 80, 616, 404),
            resizeFile(file, 2048, 1344, 80, 1024, 672),
        ]);
        return [imageSm, imageMd, imageLg];
    } catch (err) {
        throw err;
    }
}

async function getResizedImageURLs(
    file: File,
    articleKey: string
): Promise<string[]> {
    try {
        const [imageSm, imageMd, imageLg] = await createResizedVersionsOfImage(
            file
        );
        const [snapshotSm, snapshotMd, snapshotLg] = await Promise.all([
            uploadString(
                storageRef(storage, `images/${articleKey}/sm`),
                imageSm,
                "data_url"
            ),
            uploadString(
                storageRef(storage, `images/${articleKey}/md`),
                imageMd,
                "data_url"
            ),
            uploadString(
                storageRef(storage, `images/${articleKey}/lg`),
                imageLg,
                "data_url"
            ),
        ]);
        const imageURLs: string[] = await Promise.all([
            getDownloadURL(snapshotSm.ref),
            getDownloadURL(snapshotMd.ref),
            getDownloadURL(snapshotLg.ref),
        ]);
        return imageURLs;
    } catch (err) {
        throw err;
    }
}
