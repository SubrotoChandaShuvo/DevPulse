export type ROLES = "contributor" | "maintainer";

export const USER_ROLE = {
  contributor: "contributor",
  maintainer: "maintainer",
} as const;

export type GET_USER_QUERY = {
  type: "bug" | "feature_request";
  sort: "newest" | "oldest";
  status: "open" | "in_progress" | "resolved";
};
