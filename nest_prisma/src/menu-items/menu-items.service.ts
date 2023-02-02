import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MenuItem } from '@prisma/client';
import { children } from './dto/create-menu-item.dto';

@Injectable()
export class MenuItemsService {
  data: children;
  // noinspection JSUnusedLocalSymbols
  constructor(private prisma: PrismaService) {}

  /* TODO: complete getMenuItems so that it returns a nested menu structure
   Requirements:
    - your code should result in EXACTLY one SQL query no matter the nesting level or the amount of menu items.
    - it should work for infinite level of depth (children of childrens children of childrens children, ...)
    - verify your solution with `npm run test`
    - do a `git commit && git push` after you are done or when the time limit is over
    - post process your results in javascript
    Hints:
    - open the `src/menu-items/menu-items.service.ts` file
    - partial or not working answers also get graded so make sure you commit what you have
    Sample response on GET /menu:
    ```json
    [
        {
            "id": 1,
            "name": "All events",
            "url": "/events",
            "parentId": null, 
            "createdAt": "2021-04-27T15:35:15.000000Z",
            "children": [
                {
                    "id": 2,
                    "name": "Laracon",
                    "url": "/events/laracon",
                    "parentId": 1,
                    "createdAt": "2021-04-27T15:35:15.000000Z",
                    "children": [
                        {
                            "id": 3,
                            "name": "Illuminate your knowledge of the laravel code base",
                            "url": "/events/laracon/workshops/illuminate",
                            "parentId": 2,
                            "createdAt": "2021-04-27T15:35:15.000000Z",
                            "children": []
                        },
                        {
                            "id": 4,
                            "name": "The new Eloquent - load more with less",
                            "url": "/events/laracon/workshops/eloquent",
                            "parentId": 2,
                            "createdAt": "2021-04-27T15:35:15.000000Z",
                            "children": []
                        }
                    ]
                },
                {
                    "id": 5,
                    "name": "Reactcon",
                    "url": "/events/reactcon",
                    "parentId": 1,
                    "createdAt": "2021-04-27T15:35:15.000000Z",
                    "children": [
                        {
                            "id": 6,
                            "name": "#NoClass pure functional programming",
                            "url": "/events/reactcon/workshops/noclass",
                            "parentId": 5,
                            "createdAt": "2021-04-27T15:35:15.000000Z",
                            "children": []
                        },
                        { 
                            "id": 7,
                            "name": "Navigating the function jungle",
                            "url": "/events/reactcon/workshops/jungle",
                            "parentId": 5,
                            "createdAt": "2021-04-27T15:35:15.000000Z",
                            "children": []
                        }
                    ]
                }
            ]
        }
    ]
  */
  async getMenuItems(): Promise<any> {
    //throw new Error('TODO in task 3');
    const items = await this.prisma.menuItem.findMany({});

    let data: any;
    let final: any = [];
    items.forEach((element, index) => {
      data = this.binary({ ...element, children: [] }, data);
    });
    final.push(data);
    return final;
  }
  binary(value: any, root: any) {
    //seting the parent for the tree
    if (value.parentId == null) {
      return value;
    }
    //attaching the children to the parent
    if (root.id == value.parentId) {
      root.children.push(value);
      return root;
    } else if (root.children.length == 0) {
      return root;
    } else {
      const oldRoot = { ...root }; // creating the old root
      const childrens: any = [];
      root.children.forEach((element: any, index: number) => {
        childrens.push(this.binary(value, element));
      });
      oldRoot.children = childrens;
      return oldRoot;
    }
  }
}
