/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   search_node_data.c                                 :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: secho <secho@student.42seoul.kr>           +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/04/20 20:46:51 by secho             #+#    #+#             */
/*   Updated: 2020/04/21 11:47:45 by secho            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "doubly_list.h"

t_node		*search_node_data(t_list *list, int data)
{
	int		idx;
	t_node 	*new;

	idx = 1;
	new = list->head->next;
	while (new != list->tail)
	{
		if (new->data == data)
			printf("List [%d] is [%d]\n",idx, data);
		new = new->next;
		idx++;
	}
	return (new->prev);
}
