import {Self, Html, Avatar, Commits, Approve, RequestChanges, Diff, Diffstat, Comments, Activity, Merge, Decline, Statuses } from './Common';

export interface PullRequestResponse {
  values: PullRequest[]
  pagelen: number
  size: number
  page: number
}

export interface PullRequest {
  comment_count: number
  task_count: number
  type: string
  id: number
  title: string
  description: string
  state: string
  merge_commit?: MergeCommit
  close_source_branch: boolean
  closed_by?: ClosedBy
  author: Author
  reason: string
  created_on: string
  updated_on: string
  destination: Destination
  source: Source
  links: {
    self: Self
    html: Html
    commits: Commits
    approve: Approve
    "request-changes": RequestChanges
    diff: Diff
    diffstat: Diffstat
    comments: Comments
    activity: Activity
    merge: Merge
    decline: Decline
    statuses: Statuses
  }
  summary: Summary
}

export interface MergeCommit {
  type: string
  hash: string
  links: {
    self: Self
    html: Html
  }
}

export interface ClosedBy {
  display_name: string
  links: {
    self: Self
    avatar: Avatar
    html: Html
  }
  type: string
  uuid: string
  account_id: string
  nickname: string
}

export interface Author {
  display_name: string
  links: {
    self: Self
    avatar: Avatar
    html: Html
  }
  type: string
  uuid: string
  account_id: string
  nickname: string
}

export interface Destination {
  branch: Branch
  commit: Commit
  repository: Repository
}

export interface Branch {
  name: string
}

export interface Commit {
  type: string
  hash: string
  links: {
    self: Self
    html: Html
  }
}

export interface Repository {
  type: string
  full_name: string
  links: {
    self: Self
    html: Html
    avatar: Avatar
  }
  name: string
  uuid: string
}

export interface Source {
  branch: Branch
  commit: Commit
  repository: Repository
}

export interface Summary {
  type: string
  raw: string
  markup: string
  html: string
}
