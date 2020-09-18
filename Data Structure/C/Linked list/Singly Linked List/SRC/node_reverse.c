/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   node_reverse.c                                     :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: secho <secho@student.42seoul.kr>           +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/04/20 16:38:54 by secho             #+#    #+#             */
/*   Updated: 2020/04/20 17:10:14 by secho            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "linked_list.h"

void		reverse(t_node **head)
{
	t_node *prev;
	t_node *curr;
	t_node *next;

	curr = *head;
	prev = NULL;
	next = NULL;
	if (head == 0 || *head == 0)
	{
		printf("list is empty.\n");
		return ;
	}
	while (curr != NULL)
	{
		next = curr->next;
		curr->next = prev;
		prev = curr;
		curr = next;
	}
	*head = prev;
	return ;
}
