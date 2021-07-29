/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   print_list.c                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: secho <secho@student.42seoul.kr>           +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/04/20 18:47:02 by secho             #+#    #+#             */
/*   Updated: 2020/04/21 12:56:38 by secho            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "doubly_list.h"

void		print_list(t_list *list)
{
	t_node 	*p;
	int		idx;

	idx = 0;
	p = list->head->next;
	while (p != NULL && p != list->tail)
	{
		idx++;
		printf("List [%d] : %d\n", idx, p->data);
		p = p->next;
	}
		idx++;
	printf("list size is = %d\n",list->size);
	return ;
}
