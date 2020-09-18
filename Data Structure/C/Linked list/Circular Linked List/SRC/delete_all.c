/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   delete_all.c                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: secho <secho@student.42seoul.kr>           +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/04/21 18:48:51 by secho             #+#    #+#             */
/*   Updated: 2020/04/21 18:57:54 by secho            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "circular_list.h"

void		delete_all(t_list *list)
{
	t_node *tmp;

	tmp = list->tail->next;
	while (tmp != list->tail)
	{
		delete_node(list, 0);
		tmp = tmp->next;
	}
	if (tmp == list->tail)
	{
		delete_node(list, 0);
		printf("List is all deleted.\n");
	}
}
