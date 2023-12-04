import { getAllTimelinePostApi } from "@/api/timeline/timelineAPI";

/**
 * get timeline
 * params:
 */
export const getAllTimelinePostActionHandler = async (values: any) => {
  return await getAllTimelinePostApi(values);
};
