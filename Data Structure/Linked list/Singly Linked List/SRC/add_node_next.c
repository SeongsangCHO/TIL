/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   add_node_2.c                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: secho <secho@student.42seoul.kr>           +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/04/18 14:43:43 by secho             #+#    #+#             */
/*   Updated: 2020/04/18 14:57:22 by secho            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "linked_list.h"

void	add_node_next(t_node **lst, t_node *prev, int data)
{
	t_node *new;

	if (lst == 0 || !(new = create_node(data)))
		return ;
	new->next = prev->next;
	prev->next = new;
	printf("adding node[%d] at prev data[%d] next\n",new->data, prev->data);
	return ;
}
