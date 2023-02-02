export class CreateMenuItemDto {}

export class children {
  id: number;
  name: string;
  createdAt: any;
  url: string;

  parentId: number;
  children: children[];
}
