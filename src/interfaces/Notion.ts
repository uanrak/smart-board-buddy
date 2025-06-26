export interface NotionDataResponse {
  object: 'list';
  results: Page[];
  next_cursor: string | null;
  has_more: boolean;
  type: 'page_or_database';
  page_or_database: Record<string, unknown>;
  developer_survey: string;
  request_id: string;
}

export interface Page {
  object: 'page';
  id: string;
  created_time: string;
  last_edited_time: string;
  created_by: UserRef;
  last_edited_by: UserRef;
  cover: null;
  icon: Icon;
  parent: Parent;
  archived: boolean;
  in_trash: boolean;
  properties: Properties;
  url: string;
  public_url: string | null;
}

export interface UserRef {
  object: 'user';
  id: string;
}

export interface Icon {
  type: 'emoji';
  emoji: string;
}

export interface Parent {
  type: 'database_id';
  database_id: string;
}

export interface Properties {
  Today: FormulaProperty;
  'To-Do Database': RelationProperty;
  'Multi-select Today': MultiSelectProperty;
  Month: FormulaProperty;
  Week: FormulaProperty;
  'Multi-select Year': MultiSelectProperty;
  'Multi-select Week': MultiSelectProperty;
  Year: FormulaProperty;
  'Multi-select Month': MultiSelectProperty;
  Name: TitleProperty;
}

export type FormulaProperty = StringFormulaProperty | NumberFormulaProperty;

export interface StringFormulaProperty {
  id: string;
  type: 'formula';
  formula: {
    type: 'string';
    string: string | null;
  };
}

export interface NumberFormulaProperty {
  id: string;
  type: 'formula';
  formula: {
    type: 'number';
    number: number;
  };
}

export interface RelationProperty {
  id: string;
  type: 'relation';
  relation: { id: string }[];
  has_more: boolean;
}

export interface MultiSelectProperty {
  id: string;
  type: 'multi_select';
  multi_select: {
    id: string;
    name: string;
    color: string;
  }[];
}

export interface TitleProperty {
  id: string;
  type: 'title';
  title: TitleText[];
}

export interface TitleText {
  type: 'text';
  text: {
    content: string;
    link: string | null;
  };
  annotations: {
    bold: boolean;
    italic: boolean;
    strikethrough: boolean;
    underline: boolean;
    code: boolean;
    color: string;
  };
  plain_text: string;
  href: string | null;
}
