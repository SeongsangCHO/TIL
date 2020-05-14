/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   print_node.c                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: secho <secho@student.42seoul.kr>           +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/04/18 15:20:07 by secho             #+#    #+#             */
/*   Updated: 2020/04/18 17:11:17 by secho            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "linked_list.h"

void	print_node(t_node **head)
{
	int idx;

	idx = 0;
	if (head == 0)
		return ;
	t_node *p;
	p = *head;
	while (p != NULL)
	{
		printf("link[%d]: %d\n",idx + 1, p->data);
		p = p->next;
		idx++;
	}
}
