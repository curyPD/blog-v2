import { ChangeEvent } from "react";
import { useDashboard } from "@/context/DashboardProvider";
import Label from "./Label";

export default function TitleInput() {
    const { state, dispatch, REDUCER_ACTION_TYPE } = useDashboard();
    return (
        <div>
            <Label text="title" isLabelTag={true} htmlFor="titleInput" />
            <input
                id="titleInput"
                type="text"
                className="block w-full rounded-sm border border-zinc-400 px-3 py-1.5 text-sm text-zinc-900"
                value={state.title}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    dispatch({
                        type: REDUCER_ACTION_TYPE.TITLE_INPUT,
                        payload: { ...state, title: e.target.value },
                    })
                }
            />
        </div>
    );
}
