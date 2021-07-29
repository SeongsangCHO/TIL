/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   edit_node_data.c                                   :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: secho <secho@student.42seoul.kr>           +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/04/20 20:53:37 by secho             #+#    #+#             */
/*   Updated: 2020/04/21 11:36:51 by secho            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "doubly_list.h"

void		edit_node_data(t_list *list, int data, int editdata)
{
	t_node		*edit;
	int			idx;

	edit = list->head;
	idx = 0;
	while (edit != list->tail)
	{
		if (edit->data == data)
		{
			printf("List [%d] is edited [%d]\n",idx, editdata);
			edit->data = editdata;
		}

		edit = edit->next;
		idx++;
	}
}
