import {UserData } from './Common';

export type ReviewerData = {
	user: UserData;
	reviewer_type: string; // "repository",
	type: string; // "default_reviewer"
};

export type EffectiveDefaultReviewers = {
	pagelen: number; // 20,
	values: Array<ReviewerData>;
	page: number; // 1
	size: number; // 2
};