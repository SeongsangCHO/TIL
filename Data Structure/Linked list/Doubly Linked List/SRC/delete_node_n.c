/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   delete_node.c                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: secho <secho@student.42seoul.kr>           +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/04/20 19:13:19 by secho             #+#    #+#             */
/*   Updated: 2020/04/21 13:00:41 by secho            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "doubly_list.h"

void		delete_node_n(t_list *list, int n)
{
	t_node 	*del;
	int 	idx;

	del = list->head->next;
	idx = 0;
	if (n != 1)
	{
		while (del != list->tail->prev && idx < n)
		{
			del = del->next;
			idx++;
		}
	}
	del->prev->next = del->next;
	del->next->prev = del->prev;
	free(del);
	list->size--;
}
