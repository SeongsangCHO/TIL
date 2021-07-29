/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   add_node_n.c                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: secho <secho@student.42seoul.kr>           +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/04/18 15:07:07 by secho             #+#    #+#             */
/*   Updated: 2020/04/20 16:29:57 by secho            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "linked_list.h"

void		add_node_n(t_node **head, int n, int data)
{
	t_node 	*new;
	t_node 	*curr;
	int		idx;

	idx = 0;
	if (head == 0 || !(new = create_node(data)))
		return ;
	if ((curr = *head) == 0 || n == 1)
	{
		new->next = *head;
		*head = new;
		return ;
	}
	curr = *head;
	while (curr->next && idx < n - 1)
	{
		curr = curr->next;
		idx++;
	}
	new->next = curr->next;
	curr->next = new;
	return ;
}
