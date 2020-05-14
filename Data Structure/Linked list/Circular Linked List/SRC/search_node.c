/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   search_node.c                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: secho <secho@student.42seoul.kr>           +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/04/21 17:31:04 by secho             #+#    #+#             */
/*   Updated: 2020/04/21 17:39:40 by secho            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "circular_list.h"

int		search_node_data(t_list *list, int data)
{
	t_node 	*search;
	int		idx;

	idx = 0;
	search = list->tail;
	if (list->size != 0)
	{
		search = search->next;
		while (search != list->tail)
		{
			if (search->data == data)
			{
				printf("List [%d] is [%d] value\n",idx + 1, data);
			}
			search = search->next;
			idx++;
		}
	}
	else
	{
		printf("list is empty.\n");
		return (-1);
	}
	return (idx - 1);
}
