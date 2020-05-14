/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   add_node.c                                         :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: secho <secho@student.42seoul.kr>           +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/04/21 15:49:29 by secho             #+#    #+#             */
/*   Updated: 2020/04/21 18:22:59 by secho            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "circular_list.h"

void		add_node(t_list *list, int n, int data)
{
	t_node 	*pre_node;
	t_node 	*new;
	int		idx;

	idx = 0;
	new = create_node(data);
	pre_node = list->tail;
	if (list->size == 0)
	{
		new->prev = new;
		new->next = new;
		list->tail = new;
	}
	else
	{
		while (idx < n)
		{
			pre_node = pre_node->next;
			idx++;
		}
		new->next = pre_node->next;
		new->prev = pre_node;
		new->next->prev = new;
		pre_node->next = new;
		if (n == list->size)
			list->tail = new;
	}
	list->size++;
}
