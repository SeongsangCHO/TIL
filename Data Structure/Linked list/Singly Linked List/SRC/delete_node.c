/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   delete_node.c                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: secho <secho@student.42seoul.kr>           +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/04/18 15:50:41 by secho             #+#    #+#             *//*   Updated: 2020/04/18 15:50:41 by secho            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "linked_list.h"

void	delete_node(t_node **head, int n)
{
	t_node 	*p;
	t_node 	*prev;
	int		idx;

	idx = 0;
	p = *head;
	if (head == 0)
		return ;
	if (n == 1)
	{
		*head = p->next;
		free(p);
		printf("deleted first node\n");
		return ;
	}
	else
	{
		while (p != NULL && idx < n - 1)
		{
			prev = p;
			p = p->next;
			idx++;
		}
		if (p == NULL)
		{
			printf("RETRY: last node is [%d]\n",idx + 1);
			return ;
		}
		else
		{
			prev->next = p->next;
			free(p);
			printf("delete [%d] node\n",idx + 1);
			return ;
		}
	}
}
