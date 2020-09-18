/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   delete_node.c                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: secho <secho@student.42seoul.kr>           +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/04/21 17:40:22 by secho             #+#    #+#             */
/*   Updated: 2020/04/21 19:53:55 by secho            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "circular_list.h"

void	delete_node(t_list *list, int n)
{
	t_node 	*del;
	t_node 	*pre_node;
	int		idx;

	idx = 1;
	pre_node = list->tail;
	del = list->tail;
	if (list->size == 1 && n == 1)
	{
		free(del);
		return ;
	}
	if (list->size == 0)
	{
		printf("list is empty.\n");
		return ;
	}
	else
	{
		while (idx < n)
		{
			pre_node = pre_node->next;
			idx++;
		}
		printf("List [%d] is deleted.\n", idx);
		del = pre_node->next;
		pre_node->next = del->next;
		del->next->prev = pre_node;
		free(del);
		if (n == list->size)
			list->tail = pre_node;
	}
	list->size--;
	return ;
}
