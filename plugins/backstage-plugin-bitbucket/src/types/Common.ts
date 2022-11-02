
export type UserData = {
	user: {
		display_name: string; // "Patrick Wolf"
		nickname:  string; // "Patrick Wolf"
		type: string; // "user"
		uuid: string; // "{9565301a-a3cf-4b5d-88f4-dd6af8078d7e}";
		account_id: string; // "{9565301a-a3cf-4b5d-88f4-dd6af8078d7e}";
		links: {
			self: Self;
			avatar: Avatar;
			html: Html;
		}
	}
};

export interface Self {
  href: string
}

export interface Html {
  href: string
}

export interface Avatar {
  href: string
}

export interface Pullrequests {
  href: string
}

export interface Commits {
  href: string
}

export interface Forks {
  href: string
}

export interface Watchers {
  href: string
}

export interface Branches {
  href: string
}

export interface Tags {
  href: string
}

export interface Downloads {
  href: string
}

export interface Source {
  href: string
}

export interface Clone {
  name: string
  href: string
}

export interface Hooks {
  href: string
}

export interface Approve {
  href: string
}

export interface RequestChanges {
  href: string
}

export interface Diff {
  href: string
}

export interface Diffstat {
  href: string
}

export interface Comments {
  href: string
}

export interface Activity {
  href: string
}

export interface Merge {
  href: string
}

export interface Decline {
  href: string
}

export interface Statuses {
  href: string
}