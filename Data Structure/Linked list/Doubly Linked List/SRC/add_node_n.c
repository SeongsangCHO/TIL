/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   add_node_n.c                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: secho <secho@student.42seoul.kr>           +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/04/20 20:30:54 by secho             #+#    #+#             */
/*   Updated: 2020/04/20 21:05:51 by secho            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "doubly_list.h"

void		add_node_n(t_list *list, int n, int data)
{
	t_node	*curr;
	t_node 	*new;
	int		idx;

	idx = 0;
	curr = list->head;
	if (n == 0 || list == 0)
	{
		printf("list is empty.\n");
		return ;
	}
	if (n == 1)
	{
		add_node_next_head(list, data);
		return ;
	}
	new =	create_node(data);
	while (curr != list->tail && idx < n)
	{
		curr = curr->next;
		idx++;
	}
	curr->prev->next = new;
	new->next = curr;
	curr->prev = new;
	list->size++;
	return ;
}
