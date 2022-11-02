import {Self, Html, Avatar, Pullrequests, Commits, Forks, Watchers, Branches, Tags, Downloads, Source, Clone, Hooks } from './Common';

export interface RepositoryDetail {
  type: string  // "repository"
  full_name: string // "neoris-global/dso.petclinic-rest"
  links: {
    self: Self
    html: Html
    avatar: Avatar
    pullrequests: Pullrequests
    commits: Commits
    forks: Forks
    watchers: Watchers
    branches: Branches
    tags: Tags
    downloads: Downloads
    source: Source
    clone: Clone[]
    hooks: Hooks
  }
  name: string // "dso.petclinic-rest"
  slug: string // "dso.petclinic-rest"
  description: string
  scm: string // "git"
  website: any
  owner: Owner
  workspace: Workspace
  is_private: boolean
  project: Project
  fork_policy: string
  created_on: string
  updated_on: string
  size: number
  language: string
  has_issues: boolean
  has_wiki: boolean
  uuid: string
  mainbranch: Mainbranch
  override_settings: OverrideSettings
}

export interface Owner {
  display_name: string //  "NEORIS_Jira_Admin",
  links: {
    self: Self
    html: Html
    avatar: Avatar
  }
  type: string // "user"
  uuid: string
  account_id: string
  nickname: string // "NEORIS_Jira_Admin"
}

export interface Workspace {
  type: string // "workspace"
  uuid: string
  name: string // "NEORIS - Global"
  slug: string // "neoris-global"
  links: {
    self: Self
    html: Html
    avatar: Avatar
  }
}

export interface Project {
  type: string // "project"
  key: string // "IG22701727"
  uuid: string
  name: string // "22701727 - DevSecOps"
  links: {
    self: Self
    html: Html
    avatar: Avatar
  }
}

export interface Mainbranch {
  name: string
  type: string
}

export interface OverrideSettings {
  default_merge_strategy: boolean
  branching_model: boolean
}
