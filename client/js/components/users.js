export const createBlocksUsers = users => `
<tr>
    <th class="name-user">${users.username}</th>
    <td class="status-user" style="color:${users.color}">${users.admin}</td>
    <td class="btn-delete-user"><button type="button" class="delete-user" name="btn-${users.id}"></button></td>
</tr>
`