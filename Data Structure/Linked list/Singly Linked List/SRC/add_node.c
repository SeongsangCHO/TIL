/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   addnode.c                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: secho <secho@student.42seoul.kr>           +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/04/12 10:38:38 by secho             #+#    #+#             */
/*   Updated: 2020/04/18 15:37:27 by secho            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "linked_list.h"

void	add_node(t_node **head, int data)
{
	t_node *new;
	t_node *curr;

	if (head == NULL || !(new = create_node(data)))
		return ;
	if (*head == NULL)
	{
		printf("adding node at front\n");
		new->data = data;
		*head = new;
		return ;
	}
	curr = *head;
	while (curr->next)
		curr = curr->next;
	curr->next = new;
	printf("adding node at tail\n");
	return ;
}
