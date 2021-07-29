/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   edit_node.c                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: secho <secho@student.42seoul.kr>           +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/04/21 19:53:58 by secho             #+#    #+#             */
/*   Updated: 2020/04/21 19:56:44 by secho            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "circular_list.h"

void	edit_node(t_list *list, int n, int data)
{
	int		idx;
	t_node	*edit;

	edit = list->tail;
	if (list->size == 1)
	{
		edit->data = data;
		return ;
	}
	else
	{
		while (idx < n)
		{
			edit = edit->next;
			idx++;
		}
		edit->data = data;
		return ;
	}
}
