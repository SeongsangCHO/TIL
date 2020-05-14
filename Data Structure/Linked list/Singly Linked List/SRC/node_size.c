/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   node_size.c                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: secho <secho@student.42seoul.kr>           +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/04/20 16:35:03 by secho             #+#    #+#             */
/*   Updated: 2020/04/20 16:38:21 by secho            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "linked_list.h"

int			node_size(t_node **head)
{
	int 	size;
	t_node	*p;

	p = *head;
	size = 0;
	if (head == 0 || *head == 0)
	{
		printf("list is empty.\n");
		return (size);
	}
	while (p != NULL)
	{
		p = p->next;
		size++;
	}
	return (size);
}
