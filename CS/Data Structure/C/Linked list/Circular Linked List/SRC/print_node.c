/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   print_node.c                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: secho <secho@student.42seoul.kr>           +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/04/21 17:15:12 by secho             #+#    #+#             */
/*   Updated: 2020/04/21 17:55:45 by secho            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "circular_list.h"

void		print_node(t_list *list)
{
	t_node 	*print;
	int 	idx;

	idx = 0 ;
	print = list->tail;
	while (idx < list->size)
	{
		print = print->next;
		printf("List [%d] : %d\n",idx + 1, print->data);
		idx++;
	}
	return;
}
