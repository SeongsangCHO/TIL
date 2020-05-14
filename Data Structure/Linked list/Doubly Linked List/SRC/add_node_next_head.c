/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   add_node_next_head.c                               :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: secho <secho@student.42seoul.kr>           +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/04/20 18:42:14 by secho             #+#    #+#             */
/*   Updated: 2020/04/20 19:11:39 by secho            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "doubly_list.h"

void		add_node_next_head(t_list *list, int data)
{
	t_node *new;
	
	new = create_node(data);
	new->prev = list->head;
	new->next = list->head->next;
	list->head->next->prev = new;
	list->head->next = new;
	list->size++;
	return ;
}
