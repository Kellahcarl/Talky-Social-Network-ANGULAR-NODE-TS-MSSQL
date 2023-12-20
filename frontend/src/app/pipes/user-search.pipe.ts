import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userSearch',
})
export class UserSearchPipe implements PipeTransform {
  transform(users: any[], searchText: string): any[] {
    if (!users || !searchText) {
      return users;
    }

    const filtered: any[] = [];

    for (let item of users) {
      if (
        item.fullName.toLowerCase().includes(searchText.toLowerCase()) ||
        item.user_name.toLowerCase().includes(searchText.toLowerCase())
      ) {
        filtered.push(item);
      }
    }
    return filtered;
  }
}
