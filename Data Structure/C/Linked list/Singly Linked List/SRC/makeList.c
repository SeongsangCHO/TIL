/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   makeList.c                                         :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: secho <secho@student.42seoul.kr>           +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/04/18 14:09:07 by secho             #+#    #+#             */
/*   Updated: 2020/04/18 15:04:58 by secho            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "linked_list.h"

t_list	*makeList(void)
{
	t_list *list = malloc(sizeof(t_list));

	list->cnt = 0;
	list->head = NULL;
	list->tail = NULL;
	return (list);
}


