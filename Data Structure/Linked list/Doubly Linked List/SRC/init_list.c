/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   init_list.c                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: secho <secho@student.42seoul.kr>           +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/04/20 18:20:47 by secho             #+#    #+#             */
/*   Updated: 2020/04/21 11:30:37 by secho            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "doubly_list.h"

void		initList(t_list *list)
{
	printf("Initialize list\n");
	list->head = create_node(0);
	list->tail = create_node(0);
	list->head->next = list->tail;
	list->tail->prev = list->head;
	list->size = 0;
}
