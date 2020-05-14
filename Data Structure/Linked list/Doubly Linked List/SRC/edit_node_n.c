/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   edit_node_n.c                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: secho <secho@student.42seoul.kr>           +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/04/20 20:50:48 by secho             #+#    #+#             */
/*   Updated: 2020/04/21 13:01:39 by secho            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "doubly_list.h"

void		edit_node_n(t_list *list, int n, int data)
{
	int		idx;
	t_node 	*edit;

	idx = 0;
	edit = list->head;
	while (edit != list->tail && idx < n)
	{
		edit = edit->next;
		idx++;
	}
	edit->data = data;
}
