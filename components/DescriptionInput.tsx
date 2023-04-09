import { ChangeEvent } from "react";
import { useDashboard } from "@/context/DashboardProvider";
import Label from "./Label";

export default function DescriptionInput() {
    const { state, dispatch, REDUCER_ACTION_TYPE } = useDashboard();
    return (
        <div>
            <Label
                text="Description"
                isLabelTag={true}
                htmlFor="descriptionInput"
            />
            <textarea
                id="descriptionInput"
                className="block w-full resize-none rounded-sm border border-zinc-400 px-3 py-1.5 text-sm text-zinc-900 focus:outline-none focus-visible:ring-1 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 lg:text-base"
                value={state.description}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                    dispatch({
                        type: REDUCER_ACTION_TYPE.DESCRIPTION_INPUT,
                        payload: { ...state, description: e.target.value },
                    })
                }
                rows={4}
            />
        </div>
    );
}
