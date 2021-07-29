/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   edit_all_no.c                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: secho <secho@student.42seoul.kr>           +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/04/20 16:19:35 by secho             #+#    #+#             */
/*   Updated: 2020/04/20 16:23:40 by secho            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "linked_list.h"

void	edit_all_node(t_node **head, int data, int edit_data)
{
	t_node 	*edit;
	int		idx;

	idx = 1;
	edit = *head;
	if (head == 0)
	{
		printf("Edit fail : list is empty.\n");
		return ;
	}
	while (edit != NULL)
	{
		if (edit->data == data)
		{
			printf("List[%d] data is edited to %d\n",idx, edit_data);
			edit->data = edit_data;
		}
		edit = edit->next;
		idx++;
	}

}
