/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   add_node_pre_tail.c                                :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: secho <secho@student.42seoul.kr>           +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/04/20 18:33:54 by secho             #+#    #+#             */
/*   Updated: 2020/04/20 18:38:44 by secho            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "doubly_list.h"

void		add_node_pre_tail(t_list *list, int data)
{
	t_node *new;

	new = create_node(data);
	new->next = list->tail;
	new->prev = list->tail->prev;
	list->tail->prev->next = new;
	list->tail->prev = new;
	list->size++;
	return ;
}
